export default class AuthDTO {
  constructor(userResponse) {
    this.id = userResponse._id;
    this.role = userResponse.role;
  }
}
