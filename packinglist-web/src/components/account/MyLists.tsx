import React, {useEffect, useState} from "react";
import axios from 'axios';

import MyList from "./MyList.tsx";
import Loading from "../home/Loading.tsx";
import DeleteModal from "./DeleteModal.tsx";

interface MyListsProps {
}

function MyLists({}: MyListsProps) {
   const [data, setData] = useState<[] | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [modalList, setModalList] = useState<{ name: string, id: number } | null>(null);

   const handleClose = () => {
      setModalList(null)
   }
   const handleShow = (list: { name: string, id: number }) => {
      setModalList(list);
   }

   useEffect(() => {
      const fetchData = async () => {
         try {
            axios.get("/lists/", {})
               .then(response => {
                  setData(response.data);
                  setLoading(false);
               }).catch(err => {
               console.log("There was an error: " + err.response.data.detail);
               throw err;
            });
         } catch (err) {
            return "There was a problem with your request.";
         }
      };

      fetchData();
   }, []);

   const handleDeleteOnClick = (event: React.MouseEvent<HTMLElement>, listId: number | undefined) => {
      event.preventDefault();
      event.stopPropagation();
      try {
         axios.delete("/lists/" + listId)
            .then(response => {
               if (response.status == 200) {
                  window.location.reload();
               } else {
                  throw new Error("There was a problem creating the new list.");
               }
            }).catch(err => {
            console.log("There was an error: " + err.response.data.detail);
            throw err;
         });
      } catch (err: any) {
         return "There was a problem with your request.";
      }
   }

   if (loading) {
      return <Loading />;
   }
   if (data?.length == 0) {
      return <div>You have no lists created.</div>
   }

   return (
      <>
         {data?.map((item, index) => (
            <div className={"container"} key={index}>
               <MyList list={item} modalShowFunc={handleShow}/>
            </div>
         ))}
         <DeleteModal list={modalList} deleteFunc={handleDeleteOnClick} closeFunc={handleClose}/>
      </>
   )
}

export default MyLists;
