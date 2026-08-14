import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Loading from "../home/Loading.tsx";
import ListCategory from "./ListCategory.tsx";
import BackButton from "../home/BackButton.tsx";
import {PrinterFill} from "react-bootstrap-icons";

function ListDetail() {

   const params = useParams();
   const [list, setList] = useState({id: 0, name: "", categories: []});
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            axios.get(`/lists/${params.listId}`)
               .then(response => {
                  setList(response.data);
                  console.log(response.data);
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
      <div className={"container"}>
         <div className={"row justify-content-between printer-hide"}>
            <div className={"col"}>
               <BackButton url={"/home"}/>
            </div>
            <div className={"col text-end"}>
               <button type={"button"} className={"btn btn-outline-secondary"} onClick={() => window.print()}>
                  <PrinterFill/> Print
               </button>
            </div>
         </div>
         <div className={"row border-bottom"}>
            <h1>{list.name}</h1>
         </div>
         <div className={"row"} data-masonry='{"percentPosition": true}'>
            {list?.categories?.map((category, index) => (
               <div key={index} className={"col col-6"}>
                  <ListCategory category={category}/>
               </div>
            ))}
         </div>
      </div>
   )
}

export default ListDetail;
