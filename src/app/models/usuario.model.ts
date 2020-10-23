export class Usuario {
  constructor(
    public nombre,
    public mail,
    public password?: string,
    public img?: string,
    public google?: string,
    public role?: string,
    public uid?: string,
  ) {

  }
}
