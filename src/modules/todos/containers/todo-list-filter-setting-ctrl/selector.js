import _ from 'lodash';
import { push } from 'connected-react-router'

const mapStoreToProps = (store, ownProps) => {
    const routing = _.get(store, `router.location`, void 0);
    return { routing };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch_navigate (navigateTo) {
            dispatch(push(navigateTo));
        }
    }
};
export {mapStoreToProps, mapDispatchToProps};
