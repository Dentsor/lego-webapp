// @flow

import { reduxForm, SubmissionError } from 'redux-form';
import { handleSubmissionError } from './utils';

type Props = {
  onSubmitFail: any => any,
  onSubmit: any => Promise<*>,
  /* Enable auto submissionError */
  enableSubmissionError?: boolean,
  /* Move the screen to the first error in the list on SubmissionError */
  enableFocusOnError?: boolean,
  ...any
};

const legoForm = ({
  onSubmitFail = () => {},
  onSubmit,
  enableSubmissionError = true,
  enableFocusOnError = true,
  ...rest
}: Props) =>
  reduxForm({
    ...rest,
    onSubmitFail: errors => {
      onSubmitFail(errors);

      if (!enableFocusOnError) {
        return;
      }

      try {
        // We should instead check if error is SubmissionError. Does not work now
        const [firstErrorField] = Object.keys(errors);

        const field = document.querySelector(`[name="${firstErrorField}"]`);
        if (field && field.focus) {
          field.focus();
        }
      } catch (e) {
        //
      }
    },
    onSubmit: (values, dispatch, props) =>
      onSubmit(values, dispatch, props).catch(error => {
        if (error instanceof SubmissionError || !enableSubmissionError) {
          throw error;
        }

        return handleSubmissionError(error);
      })
  });

export default legoForm;
