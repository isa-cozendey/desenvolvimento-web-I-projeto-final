class User {
    constructor({ id = null, username, email, password = undefined, created_at = undefined }) {
        this.id = id ?? null;
        this.username = String(username || '').trim();
        this.email = String(email || '').trim().toLowerCase();
        this.created_at = created_at;
        this.password = password; // opcional (registro/troca)
        this._validar();
    }
    _validar() {
        const erros = [];
        if (!this.username || this.username.length < 3) erros.push('username deve ter pelo menos 3 caracteres');
        if (!this.email || !this._validarEmail(this.email)) erros.push('email inválido');
        if (this.password !== undefined) {
            const pwd = String(this.password);
            if (pwd.length < 6) erros.push('password deve ter pelo menos 6 caracteres');
        }
        if (erros.length) { const e = new Error('Dados de usuário inválidos'); e.statusCode = 400; e.details = erros; throw e; }
    }
    _validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    static fromDB(row) { return new User({ id: row.id, username: row.username, email: row.email, created_at: row.created_at }); }
    toJSON() { return { id: this.id, username: this.username, email: this.email, created_at: this.created_at }; }
}
module.exports = User;