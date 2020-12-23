import ArcherIcon from '../assets/classesIcon/gold/Archer.png';
import BerserkerIcon from '../assets/classesIcon/gold/Berserker.png';
import DarkKnightIcon from '../assets/classesIcon/gold/Dark Knight.png';
import GuardianIcon from '../assets/classesIcon/gold/Guardian.png';
import HashashinIcon from '../assets/classesIcon/gold/Hashashin.png';
import KunoichiIcon from '../assets/classesIcon/gold/Kunoichi.png';
import LahnIcon from '../assets/classesIcon/gold/Lahn.png';
import MaewhaIcon from '../assets/classesIcon/gold/Maewha.png';
import MusaIcon from '../assets/classesIcon/gold/Musa.png';
import MysticIcon from '../assets/classesIcon/gold/Mystic.png';
import NinjaIcon from '../assets/classesIcon/gold/Ninja.png';
import NovaIcon from '../assets/classesIcon/gold/Nova.png';
import RangerIcon from '../assets/classesIcon/gold/Ranger.png';
import ShaiIcon from '../assets/classesIcon/gold/Shai.png';
import SorceressIcon from '../assets/classesIcon/gold/Sorceress.png';
import StrikerIcon from '../assets/classesIcon/gold/Striker.png';
import TamerIcon from '../assets/classesIcon/gold/Tamer.png';
import ValkyrieIcon from '../assets/classesIcon/gold/Valkyrie.png';
import WarriorIcon from '../assets/classesIcon/gold/Warrior.png';
import WitchIcon from '../assets/classesIcon/gold/Witch.png';
import WizardIcon from '../assets/classesIcon/gold/Wizard.png';

const classesIcon = [
  {
    name: 'Archer',
    icon: ArcherIcon,
  },
  {
    name: 'Berserker',
    icon: BerserkerIcon,
  },
  {
    name: 'Dark Knight',
    icon: DarkKnightIcon,
  },
  {
    name: 'Guardian',
    icon: GuardianIcon,
  },
  {
    name: 'Hashashin',
    icon: HashashinIcon,
  },
  {
    name: 'Kunoichi',
    icon: KunoichiIcon,
  },
  {
    name: 'Lahn',
    icon: LahnIcon,
  },
  {
    name: 'Maewha',
    icon: MaewhaIcon,
  },
  {
    name: 'Musa',
    icon: MusaIcon,
  },
  {
    name: 'Mystic',
    icon: MysticIcon,
  },
  {
    name: 'Ninja',
    icon: NinjaIcon,
  },
  {
    name: 'Nova',
    icon: NovaIcon,
  },
  {
    name: 'Ranger',
    icon: RangerIcon,
  },
  {
    name: 'Shai',
    icon: ShaiIcon,
  },
  {
    name: 'Sorceress',
    icon: SorceressIcon,
  },
  {
    name: 'Striker',
    icon: StrikerIcon,
  },
  {
    name: 'Tamer',
    icon: TamerIcon,
  },
  {
    name: 'Valkyrie',
    icon: ValkyrieIcon,
  },
  {
    name: 'Warrior',
    icon: WarriorIcon,
  },
  {
    name: 'Witch',
    icon: WitchIcon,
  },
  {
    name: 'Wizard',
    icon: WizardIcon,
  },
];

export function loadIconClass(classe: string): string | null {
  const icon = classesIcon.find((classIcon) => classIcon.name === classe);

  if (!icon) {
    return null;
  }

  return icon.icon;
}

export function allClass(): string[] {
  return classesIcon.map((classe) => classe.name);
}
