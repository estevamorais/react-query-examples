import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { User } from "../../models/UserModel";
import { UserCard } from "../UserCard/UserCard";
import { Container } from "./styles";
import { useQuery, useQueryClient } from "react-query";
import { EditModal } from "../EditModal/EditModal";

export function UserList() {
  const queryClient = useQueryClient()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [page, setPage] = useState(1);
  const { status, data, isError, isLoading, isPreviousData } = useQuery(
    ['users-list', page],
    () => api.getUsers(page),
    { keepPreviousData: true, staleTime: 5000 }
  );

  useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(['users-list', page + 1], () =>
        api.getUsers(page + 1)
      )
    }

    console.log(data)
  }, [data, page, queryClient])

  return (
    <Container>
      <h1>Lista de Usuários</h1>
      {isLoading && <h3>Carregando...</h3>}
      {isError && <h3>Ocorreu algum problema :(</h3>}
      {data && (
        <>
          {
            data.users.map((user) => (
              <UserCard user={user} key={user.id} onClickEdit={() => setSelectedUser(user)} />
            ))
          }

          <div>Current Page: {page}</div>
          <button
            onClick={() => setPage(old => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>{' '}
          <button
            onClick={() => {
              setPage(old => (data?.hasMore ? old + 1 : old))
            }}
            disabled={isPreviousData || !data?.hasMore}
          >
            Next Page
          </button>
        </>
      )
      }
      
      {selectedUser && 
        <EditModal 
          user={selectedUser} 
          show={!!selectedUser} 
          handleClose={() => setSelectedUser(null)}
        />
      }
    </Container>
  );
}
