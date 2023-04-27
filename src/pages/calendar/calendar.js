import React, { useState, useCallback, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import ModalComponent from "../../components/modal/modal";
import FormBuk from "../../components/form-buk/form-buk";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

import Alert from "sweetalert2";
import Swal from "sweetalert2";

import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Link } from 'react-router-dom';

import axios from "axios";
const base_url = process.env.REACT_APP_API_BACK_URL;

export default function Calendar() {
	

		const token = localStorage.getItem("token");
		console.log(token);
		const headers = { "x-access-token" : token };

		const [orderss, setOrders] = useState([]);

    const [dStart, setDStart] = useState();

		useEffect(() => {
			const getOrders =  async () => {
			  const response  = await axios.get(base_url + "api/orders/read", { headers: headers } );
	
			  setOrders(response.data);
			}
			getOrders();
	  },[]);
	
	  console.log(orderss);
		
  const eventClick = eventClick => {

    const id = eventClick.event._def.publicId;
    console.log(id);
		
		console.log("event click ==",eventClick.event);
      Alert.fire({
        html:
          `<div class="table-responsive">
        <table class="table">
        <tbody>
        <tr >
        <td>PO</td>
        <td>` +
		  eventClick.event.title +
          `</td>
        </tr>
        <td>Inicio</td>
        <td>
        ` +
          eventClick.event.start +
          `
        </td>
      </tr>
      </tr>
      <td>Fin</td>
      <td>
      ` +
        eventClick.event.end +
        `
      </td>
    </tr>
		  <td>Vendor</td>
        <td>
        ` +
          eventClick.event.extendedProps.vendor +
          `
        </td>
		  </tr>
		  <td>Conatct</td>
        <td>
        ` +
          eventClick.event.extendedProps.contact +
          `
        </td>
		  </tr>
		  <td>Location</td>
        <td>
        ` +
          eventClick.event.extendedProps.location +
          `
        </td>
		  </tr>
		  <td>Product</td>
        <td>
        ` +
          eventClick.event.extendedProps.product +
          `
        </td>
		  </tr>
      <td>Price</td>
      <td>
      ` +
        eventClick.event.extendedProps.price +
        `
      </td>
    </tr>
		  <td>drop location</td>
        <td>
        ` +
          eventClick.event.extendedProps.droplocation +
          `
        </td>
		  </tr>
		  <td>Consignee</td>
        <td>
        ` +
          eventClick.event.extendedProps.consignee +
          `
        </td>
		  </tr>
        </tbody>
        </table>
        </div>`,
  
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Remover Event",
        cancelButtonText: "Cerrar"
      }).then(result => {
         if (result.value) {
           eventClick.event.remove() ; // It will remove event from the calendar
             axios.post(base_url + "api/orders/delete",
              {
                id: id,
              }
            ).then(function (response) {
              Alert.fire("Eliminar!", "Tu haz eliminado el evento.", "Ok");
            })
         }
      });
    };

    const [modalAddBuk, setModalAddBuk] = useState(false);
    
    let stateInsert = false

    const handleClickNewBook = handleClickNewBook => {
      console.log("openn...");
      
      const starDate=(handleClickNewBook.dateStr)
      console.log(starDate);
      setDStart(true);
      setModalAddBuk(true);
      <FormBuk dStart={starDate}/>
      
    };

    const addBuk = () => {
      return <FormBuk toggle={setModalAddBuk} dStart={setDStart} />;
    };

    const updateDateBuk = (eventBj) => {

      const newRange = eventBj.event._instance.range;
      const oldData = eventBj.event._def.extendedProps;
      const oldDataExt = eventBj.event._def;
      

         axios.post(base_url + `api/orders/update/${oldDataExt.publicId}`,
          {
            title: oldDataExt.title,
            vendor: oldData.vendor,
            contact: oldData.contact,
            location: oldData.location,
            product: oldData.product,
            price: oldData.oldData,
            fob: oldData.fob,
            start: newRange.start,
            end: newRange.end,
            droplocation: oldData.droplocation,
            color: oldData.color,
            consignee: oldData.consignee,
          }
         ).then(function (response) {
          console.log(response)
          Swal.fire({
            icon: 'success',
            title: "Book Send",
            showConfirmButton: false,
          });
         }).catch(function (error) {
           console.log(error);
           Swal.fire({
            title: error,
            confirmButtonColor: "#00acac",
          });
         });    
          
    }

    function renderEventContent(eventInfo) {
      console.log(eventInfo);
      return (
        <>
        <div style={{background:`${eventInfo.event._def.ui.backgroundColor}`}}>
          <b style={{color:"white"}}>{eventInfo.event._def.extendedProps.price}</b>-   <span>   </span> 
          <b style={{color:"white"}}>{eventInfo.event.title}</b> -  
          
          </div>
        </>
      )
    }


		return (
			<div>
				<ol className="breadcrumb float-xl-end">
					<li className="breadcrumb-item"><Link to="/calendar">Home</Link></li>
					<li className="breadcrumb-item active">Calendario</li>
				</ol>
				<h1 className="page-header">Calendario <small>Aqui estan los eventos ingresados...</small></h1>
				<hr />
				
        <button
                style={{ borderRadius: "15px", border: "2px solid" }}
                onClick={handleClickNewBook}
              >
                Agregar nuevo bok 
        </button>
        <hr />
        <ModalComponent
          isOpen={modalAddBuk}
          size={"lg"}
          toggle={setModalAddBuk}
          dataModal={addBuk}
        />

				<FullCalendar 
					plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, bootstrapPlugin ]}
					initialView="dayGridMonth"
					themeSystem="bootstrap"
					headerToolbar={{
						left: 'dayGridMonth,timeGridWeek,timeGridDay',
						center: 'title',
						right: 'prev,next today'
					}}
					buttonText={{
						today:    'Hoy',
						month:    'Mes',
						week:     'Semana',
						day:      'Dia'
					}}
					events={orderss}
					views={{
						timeGrid: { eventLimit: 6 }
					}}
          eventDurationEditable={false}
          editable={true}
          eventStartEditable={true}
          droppable={true}
          eventDrop={updateDateBuk}
          eventClick={eventClick}
          // dateClick={handleClickNewBook}
          locale= {esLocale}
          eventContent={renderEventContent}

				/>
			</div>
		)
	
}
