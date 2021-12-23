import { firestore } from "Firebase/config";
import Layout from "Layout";
import React, { useEffect, useState } from "react";
import './List.css'
const List = () => {
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const getUsers = () => {
    firestore.collection("User").onSnapshot((query) => {
      const docs: any = [];

      query.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setDataUsuarios(docs);
    });
   
  };
 
  useEffect(() => {
    getUsers();

  }, []);
  return (
    <Layout>
    <div className="bg">
      
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>victories</th>
            <th>phone</th>
            <th>img</th>
          </tr>
        </thead>
      {dataUsuarios.map(
        ({ id, phoneNumber, userName, victories, photoUrl }) => (
         <tbody key={id}>
           <tr>
           <td>{userName}</td>
                <td>{victories}</td>
                <td>{phoneNumber}</td>
                <td><img className="img-user" src={photoUrl} alt="" /></td>
           </tr>


         </tbody>
               
             
        )
      )}
      </table>

    </div>
    </div>
    </Layout>
  );
};

export default List;
