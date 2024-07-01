export default class AuthDTO {
  constructor(userResponse) {
    this.id = userResponse.id;
    this.role = userResponse.role;
  }
}
