// DTO de usuário — remove a senha antes de retornar ao cliente
class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.nome = user.nome;
    this.email = user.email;
    this.role = user.role;
    this.createdAt = user.createdAt;
  }
}

export default UserDTO;