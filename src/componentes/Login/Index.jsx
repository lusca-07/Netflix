import "./styles.css"
import N from "../../assets/Login/N.png"

import tmdb from '../../tmdb';
import { InputGroup, Input } from "rsuite"
import UnvisibleIcon from '@rsuite/icons/Unvisible';
import VisibleIcon from '@rsuite/icons/Visible';
import AdminIcon from '@rsuite/icons/Admin';
import { useState } from "react"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Message, toaster } from 'rsuite';


const Login = ({ item }) => {


    const [visible, setVisible] = useState(false);
    const [destaqueData, setdestaqueData] = useState(null)
    const [, setmovieList] = useState([])

    const handleChange = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        const loadAll = async () => {

            let list = await tmdb.getHomeList()
            setmovieList(list)


            //Pegando filme em destaque
            let originals = list.filter(i => i.slug === 'originals')
            let randomChosen = Math.floor(Math.random() * (originals[0].itens.results.length - 1))
            let chosen = originals[0].itens.results[randomChosen]
            let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
            setdestaqueData(chosenInfo)
        }
        loadAll()
    }, [])

    const [type] = useState('success');
    const message = (
        <Message showIcon type={type} style={{
           
        }} >
             Logado com sucesso!!
        </Message>
    );

    return (
        <div className="login">
            <div className="login-back" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${destaqueData && destaqueData.backdrop_path})`,
            }}>

            </div>

            <form action="">
                <img src={N} alt="" />
                <div className="input-area">
                    <InputGroup style={{
                        marginTop: '70px',
                        width: 350,
                        boxShadow: '0px 0px 18px 1px rgba(255,0,0,0.53)',
                    }} >
                        <Input placeholder="Usuário" name="usuario" className="input-usuario" style={{
                            fontSize: 18,
                            color: 'black',
                            padding: '17px 17px',

                        }} />
                        <InputGroup.Button >
                            <AdminIcon />
                        </InputGroup.Button>

                    </InputGroup>
                </div>

                <div className="input-area">
                    <InputGroup inside style={{
                        width: 350,
                        boxShadow: '0px 0px 18px 1px rgba(255,0,0,0.53)',
                    }} >
                        <Input type={visible ? 'text' : 'password'} name="senha" className="input-senha" placeholder="Senha" style={{
                            fontSize: 18,
                            color: 'black',
                            padding: '17px 17px',

                        }} />
                        <InputGroup.Button onClick={handleChange} style={{
                            padding: '31px 13px 28px',
                        }}>
                            {visible ? <VisibleIcon /> : <UnvisibleIcon />}
                        </InputGroup.Button>
                    </InputGroup>
                </div>
                <Link to="/register"> <h1>Ainda não tem uma conta?</h1> </Link>
                <div className="btn-entrar-ar">
                    <Link to="/user"> <button className="btn-entrar" onClick={() => toaster.push(message)} >LOGIN</button> </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;