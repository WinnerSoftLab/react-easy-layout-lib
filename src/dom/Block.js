import React, {Component} from 'react';
import PropTypes from 'prop-types';
import block from './bem';

import {
    selfAlignPropType
} from '../propTypes';

import {
    AUTO,
    TO_START,
    TO_END,
    CENTER,
    BASELINE,
    STRETCH
} from '../constants';

const bem = block('Block');

export default class Block extends Component {
    static AUTO = AUTO;
    static TO_START = TO_START;
    static TO_END = TO_END;
    static CENTER = CENTER;
    static BASELINE = BASELINE;
    static STRETCH = STRETCH;


    static defaultProps = {
        size: '',
        alignSelf: AUTO,
        grow: true,
        shrink: true,
        width: '',
        height: '',
        isRowWrapper: false,
        static: false
    };

    static propTypes = {
        isRowWrapper: PropTypes.bool.isRequired,
        size: PropTypes.string.isRequired,
        width: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
        ]),
        height: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.number.isRequired
        ]),
        alignSelf: selfAlignPropType.isRequired,
        grow: PropTypes.bool.isRequired,
        shrink: PropTypes.bool.isRequired,
        static: PropTypes.bool.isRequired,
        style: PropTypes.any // eslint-disable-line react/forbid-prop-types
    };

    render() {
        const {
            className, isRowWrapper, size, width, height, alignSelf, grow,
            shrink, static: staticProp, style, children, ...otherProp
        } = this.props;

        const styles = Object.assign({}, style || {});

        if (width) {
            styles.width = typeof width === 'number' ? `${width}px` : width;
        }

        if (height) {
            styles.height = typeof height === 'number' ? `${height}px` : height;
        }

        if (size) {
            styles.flexBasis = size;
            styles.WebkitFlexBasis = size;
            styles.MsFlexPreferredSize = size;
        }

        return <div {...otherProp} style={styles} className={bem({
            isRowWrapper: isRowWrapper,
            static: staticProp,
            alignSelf: alignSelf,
            grow: grow && !staticProp,
            noGrow: !grow || staticProp,
            shrink: shrink && !staticProp,
            noShrink: !shrink || staticProp
        }) + ' ' + (className  || '')}>
            {children}
        </div>;
    }
}
