//@flow
import { compose } from 'redux';
import HTTPError from 'app/routes/errors';
import { setStatusCode } from 'app/actions/RoutingActions';
import prepare from 'app/utils/prepare';

export default compose(
  prepare((props, dispatch) => dispatch(setStatusCode(404)))
)(HTTPError);
