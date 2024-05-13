import React from 'react'
import { useState } from 'react';
import { MdOutlineClear, MdOutlineCheck } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from 'axios';

const EditUserProfileModal = ({ selectedUser, onClose }) => {
  const [name, setName] = useState(selectedUser ? selectedUser.name : '');
  const [username, setUsername] = useState(selectedUser ? selectedUser.username : '');
  const [email, setEmail] = useState(selectedUser ? selectedUser.email : '');
  const [dateOfBirth, setDateOfBirth] = useState(selectedUser ? selectedUser.dateOfBirth : '');
  const [profession, setProfession] = useState(selectedUser ? selectedUser.profession : '');
  const [gender, setGender] = useState(selectedUser ? selectedUser.gender : '');
  const [password, setPassword] = useState(selectedUser ? selectedUser.password : '');
  const [isAdmin, setIsAdmin] = useState(selectedUser ? selectedUser.isAdmin : '');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/admin/${selectedUser._id}`, {
        name,
        username,
        email,
        dateOfBirth,
        profession,
        gender,
        password,
        isAdmin
      });
      onClose();
      toast.success('Perfil atualizado com sucesso.')
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>
        <form className='max-w-[1240px] align-middle mx-auto flex flex-col text-white bg-black border border-black rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-70 border-opacity-70' onSubmit={submitHandler}>
          <div>
            <div className='flex justify-end'>
              <MdOutlineClear size={25} className='mx-2 sm:mx-5 cursor-pointer' onClick={onClose} />
              <MdOutlineCheck size={25} className='ml-2 sm:ml-5 cursor-pointer' onClick={submitHandler} type='submit' />
            </div>
          </div>
          <div className='max-w-[1240px] flex flex-col sm:flex-row justify-between'>
            <div className='sm:w-[45%]'>
              <div className='relative sm:my-6 my-4'>
                <input type="text" className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nome</label>
              </div>
              <div className='relative sm:my-6 my-4'>
                <input type="email" className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Endereço de E-mail</label>
              </div>
              <div className='relative sm:my-6 mb-4'>
                <input type="text" className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Nome de utilizador</label>
              </div>
              <div className='relative sm:my-6 my-4'>
                <input type="text" className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Data de nascimento</label>
              </div>
            </div>
            <div className='sm:w-[45%] items-start'>
              <div className='relative sm:my-6 mb-4'>
                <select className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" name="profession" value={profession} onChange={(e) => setProfession(e.target.value)}>
                  <option value="Sem atividade profissional" className="text-gray-900">Sem atividade profissional</option>
                  <option value="Estudante" className="text-gray-900">Estudante</option>
                  <option value="Desempregado" className="text-gray-900">Desempregado</option>
                  <option value="Reformado" className="text-gray-900">Reformado</option>
                  <option value="Trabalhador por conta própria" className="text-gray-900" >Trabalhador por conta própria</option>
                </select>
                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Profissão</label>
              </div>
              <div className='relative sm:my-6 my-4'>
                <select className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="Não especificar" className="text-gray-900">Não especificar</option>
                  <option value="Masculino" className="text-gray-900">Masculino</option>
                  <option value="Feminino" className="text-gray-900">Feminino</option>
                </select>
                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Género</label>
              </div>
              <div className='relative sm:my-6 mb-4'>
                <select className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" name="isAdmin" value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}>
                  <option value="false" className="text-gray-900">Não</option>
                  <option value="true" className="text-gray-900">Sim</option>
                </select>
                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Admministrador</label>
              </div>
              <div className='relative sm:my-6 my-4'>
                <input type="text" className="block w-full py-2.3 px-0 text-lg bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-slate-300 focus:outline-none focus:ring-0 focus:text-white focus:border-slate-300 peer" placeholder="" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="" className="absolute text-lg duration-300 transform -translate-y-5 scale-75 top-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-400 peer-focus:dark:text-slate-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Password</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditUserProfileModal