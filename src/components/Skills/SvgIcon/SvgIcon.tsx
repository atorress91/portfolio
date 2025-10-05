import React from 'react';
import Image from 'next/image';
import styles from '../Skills.module.scss';

interface SvgIconProps {
  name: string;
  size?: number;
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, size = 32 }) => {
  return <Image src={`svg/${name}.svg`} alt={name} className={styles.svgIcon} width={size} height={size} />;
};

export default SvgIcon;
