const axios = require('axios')

describe('cropController', () => {
    let result

    test('store a valid user', async () => {
        result = await axios.post('http://localhost:3333/user/store', {
            foto: 'https://avatars.githubusercontent.com/u/34221747?v=4',
            usuario: 'Mateuskwz',
            nome: 'Mateus Takeshi Kawazoe',
            email: 'Matkawazoe@gmail.com',
            endereco: 'Rua Brigadeiro Franco, 2190, 80250-030, Centro, Curitiba, Paraná'
        })
        expect(result.data.usuario).toBe('Mateuskwz')
    })

    test('store a valid crop', async () => {
        result = await axios.post('http://localhost:3333/crop/store', {
            nome: 'Fazendinha Feliz',
            dono: 'Mateuskwz',
            participantes: ['Mateuskwz'],
            endereco: 'Rua Brigadeiro Franco, 2190, 80250-030, Centro, Curitiba, Paraná'
        })
        expect(result.data.usuario).toBe('Mateuskwz')
    })

    test('delete the stored crop', async () => {
        result = await axios.delete('http://localhost:3333/crop/delete', {
            data: {
                dono: 'Mateuskwz',
                nome: 'Fazendinha Feliz'
            }
        })
        expect(result.data).toBe('Horta deletado com sucesso!')
    })

    test('delete the stored user', async () => {
        result = await axios.delete('http://localhost:3333/user/delete', {
            headers: { usuario: 'Mateuskwz' }
        })
        expect(result.data).toBe('Usuário deletado com sucesso!')
    })
})