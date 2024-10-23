import { useDispatch, useSelector } from "react-redux";
import DisplayCards from "../../components/DisplayCards";
import NotAvailableFavourites from "../../components/NotAvailableFavourites";

const Favourite = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.user;
  });

  const favourites = useSelector((state) => {
    return state.favourites;
  });

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  return (
    <div className="profile-favourites dotted-border">
      {favourites.error ? (
        <NotAvailableFavourites error="yes" />
      ) : favourites.favourites.length == 0 ? (
        <NotAvailableFavourites favourites="zero" error="no" />
      ) : (
        <DisplayCards data={favourites.favourites} swiper="not-include" />
      )}
    </div>
  );
};

export default Favourite;
