import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../../../store/users";
import PropTypes from "prop-types";

const UsersLoader = ({ children }) => {
    const dataLoaded = useSelector(getDataStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataLoaded) dispatch(loadUsersList());
    }, []);
    if (!dataLoaded) return "loading...";

    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;
