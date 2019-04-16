

import React from 'react';
import QuoteList from './QuoteList';
import styles from './Quotes.css';
import cx from 'classnames';
import { navigation } from '../utils';
import Button from 'app/components/Button';
import { ActionGrant, ID } from 'app/models';
import { QuoteEntity } from 'app/reducers/quotes';

type Props = {
  comments: Array<Object>,
  query: Object,
  quotes: Array<QuoteEntity>,
  actionGrant: ActionGrant,
  approve: number => Promise<*>,
  unapprove: number => Promise<*>,
  deleteQuote: number => Promise<*>,
  fetchMore: ({ approved: boolean }) => Promise<*>,
  showFetchMore: boolean,
  currentUser: any,
  loggedIn: boolean,
  comments: Object,
  deleteComment: (id: ID, commentTarget: string) => Promise<*>
};

export default function QuotePage({
  query,
  quotes,
  approve,
  unapprove,
  actionGrant,
  deleteQuote,
  fetchMore,
  showFetchMore,
  currentUser,
  loggedIn,
  comments,
  deleteComment,
  ...props
}: Props) {
  let errorMessage = undefined;
  if (quotes.length === 0) {
    errorMessage =
      query.filter === 'unapproved'
        ? 'Ingen sitater venter på godkjenning.'
        : 'Fant ingen sitater. Hvis du har sendt inn et sitat venter det trolig på godkjenning.';
  }
  return (
    <div className={cx(styles.root, styles.quoteContainer)}>
      {navigation('Sitater', actionGrant)}

      {errorMessage || (
        <QuoteList
          approve={approve}
          unapprove={unapprove}
          deleteQuote={deleteQuote}
          actionGrant={actionGrant}
          quotes={quotes}
          currentUser={currentUser}
          loggedIn={loggedIn}
          comments={comments}
          deleteComment={deleteComment}
        />
      )}
      {showFetchMore && (
        <Button
          onClick={() => fetchMore({ approved: query.filter !== 'unapproved' })}
        >
          Last inn flere
        </Button>
      )}
    </div>
  );
}
