import { useEffect, useState } from "react";
import { api } from "../../api/api";
import { User } from "../../models/UserModel";
import { UserCard } from "../UserCard/UserCard";
import { Container } from "./styles";
import { useQuery } from "react-query";
import { EditModal } from "../EditModal/EditModal";

export function UserList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { data: userList, isError, isLoading } = useQuery('users-list', api.getUsers);

  return (
    <Container>
      <h1>Lista de Usuários</h1>
      {isLoading && <h3>Carregando...</h3>}
      {isError && <h3>Ocorreu algum problema :(</h3>}
      {userList?.map((user) => (
        <UserCard user={user} key={user.id} onClickEdit={() => setSelectedUser(user)} />
      ))}
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
