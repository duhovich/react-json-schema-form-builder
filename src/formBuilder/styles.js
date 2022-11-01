// @flow

export const arrows = {
  '& .arrows': {
    display: 'inline-flex',
    '& button': {
      position: 'relative',
      margin: '0',
      padding: '24px',
      'border-radius': '50%',
      border: 'none',
      background: 'white',
      '&:after': {
        position: 'absolute',
        width: '36px',
        height: '36px',
        content: "''",
        'background-repeat': 'no-repeat',
        'background-size': '24px',
        right: '0%',
        top: '12px',
      },
      '&:hover': {
        background: 'rgba(0,0,0,.05)',
      },
      '&.up:after': {
        'background-image': `url("data:image/svg+xml;charset=UTF-8,%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 490 490' style='enable-background:new 0 0 490 490;' xml:space='preserve'%3e%3cg%3e%3cpolygon points='237.343,31.931 237.343,490 252.657,490 252.657,31.931 390.651,189.082 402.167,178.972 245,0 87.833,178.972 99.349,189.082 '/%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e ")`,
      },
      '&.down:after': {
        'background-image': `url("data:image/svg+xml;charset=UTF-8,%3csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 490 490' style='enable-background:new 0 0 490 490;' xml:space='preserve'%3e%3cpolygon points='237.339,0 237.339,458.069 99.333,300.928 87.832,311.038 244.996,490 402.168,311.038 390.652,300.928 252.654,458.069 252.654,0 '/%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e ")`,
      },
    },
  },
};
