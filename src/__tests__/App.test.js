import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import Commanders from '../data/commanders.json';
import { dataVersion } from '../../package.json';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document
  }
});

jest.mock('react-ga');

afterEach(cleanup);

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App url="/" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('removes version warning when resetting talents', () => {
    if (dataVersion > 1) {
      const url = `?1;1;irnsscpkv;faaaaaaaaa;issralahnq`;
      const { getByTestId } = render(<App url={url} />);
      const warning = getByTestId('version-warning');

      expect(warning).toBeInTheDocument();
      fireEvent.click(getByTestId('button-reset'));
      expect(warning).not.toBeInTheDocument();
    }
  });

  it('shows embed message', () => {
    const url = `?1;1;irnsscpkv;faaaaaaaaa;issralahnq`;
    const { getByTestId } = render(<App url={url} isEmbed={true} />);
    const message = getByTestId('embed-message');

    expect(message).toBeInTheDocument();
  });

  it('toggles info panel on settings change', () => {
    const { getByTestId } = render(<App url="/" />);
    const infoPanel = getByTestId('info-panel');

    expect(infoPanel).toHaveAttribute('class', 'info-panel-open');

    fireEvent.click(getByTestId('select-settings'));
    fireEvent.click(getByTestId('settings-info-panel'));
    expect(infoPanel).toHaveAttribute('class', 'info-panel-closed');

    fireEvent.click(getByTestId('settings-info-panel'));
    expect(infoPanel).toHaveAttribute('class', 'info-panel-open');
  });

  it('toggles node point values on settings change', () => {
    const url = `?1;5;aaaaaaaaaa;aaaaaaaaa;idabacaaa`;
    const { getByTestId, queryAllByTestId } = render(<App url={url} />);
    const nodeValue = queryAllByTestId('node-value')[0];

    expect(nodeValue).toBeInTheDocument();

    fireEvent.click(getByTestId('select-settings'));
    fireEvent.click(getByTestId('settings-values'));
    expect(nodeValue).not.toBeInTheDocument();
  });

  it('toggles tree totals on settings change', () => {
    const url = `?1;5;aaaaaaaaaa;aaaaaaaaa;idabacaaa`;
    const { getByTestId, queryAllByTestId } = render(<App url={url} />);
    const treeTotal = queryAllByTestId('tree-total')[0];

    expect(treeTotal).toBeInTheDocument();

    fireEvent.click(getByTestId('select-settings'));
    fireEvent.click(getByTestId('settings-totals'));
    expect(treeTotal).not.toBeInTheDocument();
  });

  // it('shows main talents in the stats panel', () => {
  //   const url = `?1;5;aaaaaaaaaa;aaaaaaaaa;iaaaaaaaa`;
  //   const { getByTestId } = render(<App url={url} />);
  //   expect(getByTestId('stats-talents')).not.toHaveTextContent(
  //     'Lord of War'
  //   );
  //   fireEvent.click(getByTestId('Attack4'));
  //   expect(getByTestId('stats-talents')).toHaveTextContent(
  //     'Lord of War'
  //   );
  // });

  // it('shows correct number of maximum multidimensional talent levels in stats panel', () => {
  //   const url = `?1;5;aaaaaaaaaa;aaaaaaaaa;idabacaaa`;
  //   const { getByTestId } = render(<App url={url} />);
  //   expect(getByTestId('stats-talents')).toHaveTextContent(
  //     'Fight To The Death (2/3)'
  //   );
  //   expect(getByTestId('stats-talents')).not.toHaveTextContent(
  //     'Fight To The Death (2/2)'
  //   );
  // });

  // it('shows correct stat value of multidimensional talents in stats panel', () => {
  //   const url = `?1;5;aaaaaaaaaa;aaaaaaaaa;idabacaaa`;
  //   const { getByTestId } = render(<App url={url} />);
  //   expect(getByTestId('stats-talents')).toHaveTextContent(
  //     'Increases all damage dealt by 4%, but also increases all damage taken by 2%'
  //   );
  // });

  describe('URL', () => {
    it('causes warning when build uses old data version', () => {
      if (dataVersion > 1) {
        const url = `?${dataVersion - 1};1;irnsscpkv;faaaaaaaaa;issralahnq`;
        const { getByTestId } = render(<App url={url} />);

        expect(getByTestId('version-warning')).toBeInTheDocument();
      }
    });

    it('causes invalid modal when incorrect data version', () => {
      const url = `?${dataVersion + 1};1;irnsscpkv;faaaaaaaaa;issralahnq`;
      const { getByTestId } = render(<App url={url} />);

      expect(document.body).toHaveClass('modal-open');
      expect(getByTestId('invalid-modal-body')).toHaveTextContent(
        'Incorrect game data version'
      );
    });

    it('causes invalid modal when commander ID is unknown', () => {
      const url = `?1;${Object.keys(Commanders).length +
        1};irnsscpkv;faaaaaaaaa;issralahnq`;
      const { getByTestId } = render(<App url={url} />);

      expect(document.body).toHaveClass('modal-open');
      expect(getByTestId('invalid-modal-body')).toHaveTextContent(
        'Unknown commander ID'
      );
    });

    it('causes invalid modal when the talent array is the wrong length', () => {
      const url = `?1;1;irnsscpkv;faaaaaaaaa;issralahn`;
      const { getByTestId } = render(<App url={url} />);

      expect(document.body).toHaveClass('modal-open');
      expect(getByTestId('invalid-modal-body')).toHaveTextContent(
        'Incorrect number of talents'
      );
    });

    it('causes invalid modal when too many points assigned to a talent', () => {
      const url = `?1;1;irnsscpkv;kaaaaaaaaa;issralahnq`;
      const { getByTestId } = render(<App url={url} />);

      expect(document.body).toHaveClass('modal-open');
      expect(getByTestId('invalid-modal-body')).toHaveTextContent(
        'Too many points assigned in talent'
      );
    });

    it('causes invalid modal when too many points spent', () => {
      const url = `?1;1;irnsscpkv;faaaaaaaab;issralahnq`;
      const { getByTestId } = render(<App url={url} />);

      expect(document.body).toHaveClass('modal-open');
      expect(getByTestId('invalid-modal-body')).toHaveTextContent(
        'Number of spent talent points exceeds maximum'
      );
    });

    it('causes invalid modal when too many URL params', () => {
      const url = `?1;1;irnsscpkv;faaaaaaaab;issralahnq;123;12`;
      const { getByTestId } = render(<App url={url} />);

      expect(document.body).toHaveClass('modal-open');
      expect(getByTestId('invalid-modal-body')).toHaveTextContent(
        'Incorrect number of build parameters '
      );
    });

    it('causes invalid modal when too few URL params', () => {
      const url = `?1;1;irnsscpkv;faaaaaaaab`;
      const { getByTestId } = render(<App url={url} />);

      expect(document.body).toHaveClass('modal-open');
      expect(getByTestId('invalid-modal-body')).toHaveTextContent(
        'Incorrect number of build parameters '
      );
    });
  });
});
