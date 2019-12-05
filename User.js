class User {
    constructor(user) {
        this.name = user.name
        this.matchas = user.matchas
        this.lifeTimeMatchas = user.lifeTimeMatchas
        this.cursors = user.cursors
        this.baberistas = user.baberistas
        this.id = user.id
        this.mps = user.mps
        User.all.push(this)
        // this.addCandy = this.addCandy.bind(this)
    }
}
User.all = []