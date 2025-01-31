import "./profile_tab/style.css";
import ProfileInfo from "./profile_tab/Profile_Info";
import SearchInput from "./profile_tab/Search_Input";
import NewNoteButton from "./profile_tab/New_Note_Button";
import Configurations from "./profile_tab/Configurations";


export default function ProfileTab() {
  return (
    <section className="profile-tab">
      <ProfileInfo></ProfileInfo>
      <div className="profile-tab_buttons">
        <SearchInput></SearchInput>
        <NewNoteButton></NewNoteButton>
      </div>
      <Configurations></Configurations>
    </section>
  );
}