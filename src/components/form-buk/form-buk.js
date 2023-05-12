import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const base_url = process.env.REACT_APP_API_BACK_URL;

export default function FormBuk({ orderEdit, toggle, dStart }) {
  const data = orderEdit?.originalRow;
  console.log({orderEdit});
 
  const { register, handleSubmit } = useForm();

  

  const onSubmit = (Ordersss) => {
    if (Ordersss) {

      const  refreshPage = () => {
        window.location.reload(true);
      }

      if (Ordersss.fob === "FOB"){
        var newEndDate = new Date(Ordersss.start);
        var newStarDate = new Date(Ordersss.start);
        var addMlsecond = 60*60000
        newStarDate.setDate(newStarDate.getDate()+3)
        var numbersecondend = newStarDate.getTime()
        newEndDate = new Date(numbersecondend + addMlsecond)
        Ordersss.start = newStarDate;
        Ordersss.end = newEndDate;  
      }else if (Ordersss.fob === "CAF") {
        var newEndDate = new Date(Ordersss.start);
        var newStarDate = new Date(Ordersss.start);
        var addMlsecond = 60*60000
        newStarDate.setDate(newStarDate.getDate()+1)
        var numbersecondend = newStarDate.getTime()
        newEndDate = new Date(numbersecondend + addMlsecond);

        // newStarDate.setDate(newEndDate.getDate()+addMlsecond2);
        // newEndDate.setDate(newEndDate.getDate()+addMlsecond);
        Ordersss.start = newStarDate;
        Ordersss.end = newEndDate;
      }

      console.log(handleSubmit.starDate);
      axios
      .post(base_url + "api/orders/create", {
        title: Ordersss.title,
        vendor: Ordersss.vendor,
        contact: Ordersss.contact,
        location: Ordersss.location,
        product: Ordersss.product,
        price: Ordersss.price,
        fob: Ordersss.fob,
        start: Ordersss.start,
        end: Ordersss.end,
        droplocation: Ordersss.droplocation,
        color: Ordersss.color,
        consignee: Ordersss.consignee
      })
      .then(function (response) {
        console.log(response);
        Swal.fire({
         icon: 'success',
         title: "Data insert.",
         showConfirmButton: false,
         refreshPage,

       }); 
      })
      .catch(function (error) {
            Swal.fire({
              title: "Error.",
              confirmButtonColor: "#00acac",
            });
        console.log(error);
      });
     
      console.log( "Ordersss ==", Ordersss);
    }
    toggle(false);
  };
  return (
    <>
    
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-3">
          <label
            htmlFor="title"
            className="form-label col-form-label col-md-3"
          >
            PO
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.title}
              name="title"
              type="number"
              className="input-form"
              {...register("title")}
              placeholder="Insert title"
              required
            />
          </div>
        </div>
        {/* <div className="row mb-3">
          <label
            htmlFor="po"
            className="form-label col-form-label col-md-3"
          >
            PO
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.po}
              name="po"
              type="number"
              className="input-form"
              {...register("po")}
              placeholder="Insert PO"
            />
          </div>
        </div> */}
        <div className="row mb-3">
          <label
            htmlFor="vendor"
            className="form-label col-form-label col-md-3"
          >
            Vendor
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.vendor}
              name="vendor"
              type="text"
              className="input-form"
              {...register("vendor")}
              placeholder="Insert vendor"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="contact" className="form-label col-form-label col-md-3">
            Contact
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.contact}
              name="contact"
              type="text"
              className="input-form"
              {...register("contact")}
              placeholder="Insert contact"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="location"
            className="form-label col-form-label col-md-3"
          >
            Location
          </label>
          <div className="col-md-8">
            <select
              defaultValue={data?.location}
              name="location"
              type="text"
              className="input-form"
              {...register("location")}
              placeholder="Insert location"
            >
                 <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="product"
            className="form-label col-form-label col-md-3"
          >
            Product
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.product}
              name="product"
              type="text"
              className="input-form"
              {...register("product")}
              placeholder="Insert product"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="fob"
            className="form-label col-form-label col-md-3"
          >
            FOB
          </label>
          <div className="col-md-8">
            <select
              defaultValue={data?.fob}
              name="fob"
              type="text"
              className="input-form"
              {...register("fob")}
              placeholder="Insert fob"
            >
              <option>FOB</option>
              <option>CAF</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="start"
            className="form-label col-form-label col-md-3"
          >
            Start
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.start}
              name="start"
              type="date"
              className="input-form"
              {...register("start")}
              placeholder="Insert start"
              required
              
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="price"
            className="form-label col-form-label col-md-3"
          >
            Precio
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.price}
              name="price"
              type="string"
              className="input-form"
              {...register("price")}
              placeholder="insert price +0.000L" 
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="droplocation"
            className="form-label col-form-label col-md-3"
          >
            Drop location
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.droplocation}
              name="droplocation"
              type="text"
              className="input-form"
              {...register("droplocation")}
              placeholder="Insert drop location"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="consignee"
            className="form-label col-form-label col-md-3"
          >
            Consignee
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.consignee}
              name="consignee"
              type="text"
              className="input-form"
              {...register("consignee")}
              placeholder="Insert consignee"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="color"
            className="form-label col-form-label col-md-3"
          >
            Color
          </label>
          <div className="col-md-8">
            <input
              defaultValue={data?.color}
              name="color"
              type="color"
              className="input-form"
              {...register("color")}
              placeholder="Insert color"
            />
          </div>
        </div>
        <div style={{ marginTop: "15px" }}>
          <input type="submit" />
        </div>
      </form>
    </>
  );
}
