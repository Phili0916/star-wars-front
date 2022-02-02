import {
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";

export default function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let params = useParams();
    let navigate = useNavigate();
    console.log('withRouter', {location, navigate, params,})
    return (
        <Component
            {...props}
            navigate={navigate}
            router={{location, params}}
        />
    );
  }

  return ComponentWithRouterProp;
}