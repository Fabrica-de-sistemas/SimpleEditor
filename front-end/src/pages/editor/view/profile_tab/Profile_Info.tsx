import Circle from "../components/Circle";
import "./profile_info/style.css";

export default function ProfileInfo() {
  return (
    <section className="profile_row">
      <Circle {...{size: 64, backgroundColor: "green"}}></Circle>
      <div className="profile_name_column">
        <h3>Carlos Soares</h3>
        <small>carlos@gmail.com</small>
      </div>
      <div className="notifications">
        N
      <div className="number_account">
        1  
      </div>  
      </div>
    </section>
  );
}