import {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {createReview} from '../../redux/actions/reviewsActions';

export const useCreateReviewHook = () => {
  const dispatch = useDispatch();
  const [reviewState, setReviewState] = useState(false);
  const reviewCreateFunc = useCallback(data => {
    const response = dispatch(createReview(data));
    setReviewState(true);
    return response;
  }, []);
  return [reviewState, reviewCreateFunc];
};
