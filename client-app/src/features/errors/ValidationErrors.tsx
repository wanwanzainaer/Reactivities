import React, { FC } from 'react';
import { Message } from 'semantic-ui-react';
interface Props {
  errors: string[] | null;
}
const ValidationErrors: FC<Props> = ({ errors }) => {
  return (
    <Message>
      {errors && (
        <Message.List>
          {errors.map((err: any, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
};
export default ValidationErrors;
