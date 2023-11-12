export class AuthDTO {
  id;
  role;

  constructor(userResponse) {
    this.id = userResponse._id;
    this.role = userResponse.role;
  }
}
