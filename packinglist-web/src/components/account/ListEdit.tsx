import ListCreate from "./ListCreate.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../home/Loading.tsx";
import {useParams} from "react-router-dom";

function ListEdit() {
   const params = useParams();
   const [list, setList] = useState({id: 0, name: "", categories: []});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            axios.get(`/lists/${params.listId}/`)
               .then(response => {
                  setList(response.data);
                  setLoading(false);
               }).catch(err => {
                  console.log("There was an error: " + err.response.data.detail);
                  throw err;
               });
         } catch (err) {
            return "There was a problem with your request.";
         }
      }

      fetchData();
   }, []);

   if (loading) return <Loading />;

   return (
      <ListCreate list={list} />
   )
}

export default ListEdit;
