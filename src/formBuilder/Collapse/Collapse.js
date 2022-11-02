// @flow

import React from 'react';
import type { Node } from 'react';
import { createUseStyles } from 'react-jss';
import { Collapse as RSCollapse } from 'reactstrap';
import classnames from 'classnames';

const useStyles = createUseStyles({
  collapseElement: {
    '& .disabled': { '.toggle-collapse': { cursor: 'default' } },
    // '& h4': { marginTop: '7px', padding: '13px 10px 10px 10px' },
    '& .collapse-head': { display: 'flex', 'align-items': 'center' },
    '& .toggle-collapse': {
      position: 'relative',
      margin: '10px',
      padding: '24px',
      cursor: 'pointer',
      'border-radius': '50%',
      border: 'none',
      background: 'white',
      '&:after': {
        position: 'absolute',
        width: '20px',
        height: '20px',
        content: "''",

        'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e")`,
        'background-repeat': 'no-repeat',
        'background-size': '20px',
        right: '14px',
        top: '14.5px',
        transition: 'transform .2s ease-in-out',
      },
      '&.open': {
        '&:after': {
          transform: 'rotate(-180deg)',
        },
      },
      '&:hover': {
        background: 'rgba(0,0,0,.05)',
      },
    },
  },
});

type Props = {
  // Determines if the Collapse component is open
  isOpen: boolean,
  // Toggles the isOpen boolean between true and false
  toggleCollapse: () => void,
  // The title to display in the collapse header
  title: Node,
  // Anything to be rendered within the collapse
  children: any,
  // If true will gray out and disable */
  disableToggle?: boolean,
  className?: string,
};

export default function Collapse(props: Props): Node {
  const classes = classnames(
    `collapse-element ${props.className || ''} ${useStyles().collapseElement}`,
    {
      disabled: props.disableToggle,
    },
  );

  return (
    <div className={classes}>
      <div className='collapse-head'>
        <button
          className={props.isOpen ? 'toggle-collapse open' : 'toggle-collapse'}
          onClick={!props.disableToggle ? props.toggleCollapse : () => {}}
        ></button>
        {props.title}
      </div>
      <RSCollapse isOpen={props.isOpen}>
        <div>{props.children}</div>
      </RSCollapse>
    </div>
  );
}
