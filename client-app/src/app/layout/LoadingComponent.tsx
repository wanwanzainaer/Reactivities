import React, { FC } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface LoadingComponentProps {
  inverted?: boolean;
  content?: string;
}

const LoadingComponent: FC<LoadingComponentProps> = ({
  inverted = true,
  content = 'Loading...',
}) => {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};
export default LoadingComponent;
