import React from 'react';
import Text from './Text';
import Link from './Link';
import Table from './Table';
import Import from './Import';

const Content = ({ part }) => {
  if (typeof part === 'string') {
    return <Text text={part} />;
  } else if (part.link) {
    return <Link link={part.link} text={part.text} />;
  } else if (part.table) {
    return <Table content={part.table} />;
  } else if (part.import) {
    return <Import />;
  } else {
    return null;
  }
};

export default Content;
