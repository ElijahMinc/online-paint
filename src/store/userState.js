import { makeAutoObservable } from "mobx"

class UserState {
  users = 0

  constructor() {
    makeAutoObservable(this)
  }
  setUsers(users) {
    this.users = users
  }
}

export default new UserState()
