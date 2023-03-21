import {
  GridOn as GridOnIcon,
  Person as PersonIcon,
  Plagiarism as PlagiarismIcon,
  ScreenSearchDesktop as ScreenSearchDesktopIcon,
  Build as BuildIcon
} from '@mui/icons-material';
import Paths from '../../constants/paths';
import { SubMenuProps } from './components/SubMenu';

export const menuItems: SubMenuProps[] = [
  {
    header: 'Munca',
    items: [
      {
        icon: GridOnIcon,
        text: 'Monitor',
        href: Paths.MONITOR,
      },
    ],
  },
  {
    header: 'Cautare',
    items: [
      {
        icon: ScreenSearchDesktopIcon,
        text: 'Cautare Proiecte',
        href: Paths.PROJECTS_SEARCH,
      },
      {
        icon: PlagiarismIcon,
        text: 'Cautare Documente',
        href: Paths.DOCUMENTS_SEARCH,
      },
    ],
  },
  {
    header: 'Configurari',
    items: [
      {
        icon: BuildIcon,
        text: 'Optiuni',
        href: "#options",
      },
      {
        icon: PersonIcon,
        text: 'Profilul Meu',
        href: "#profile",
      },
    ],
  },
];
