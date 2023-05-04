import {
  GridOn as GridOnIcon,
  Person as PersonIcon,
  Plagiarism as PlagiarismIcon,
  ScreenSearchDesktop as ScreenSearchDesktopIcon,
  Build as BuildIcon,
  SmartToy as SmartToyIcon,
  ManageAccounts as ManageAccountsIcon,
} from '@mui/icons-material';
import Paths from '../../constants/paths';
import { SubMenuProps } from './components/SubMenu';
import { Role } from 'constants/roles';

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
        href: Paths.OPTIONS,
      },
      {
        icon: PersonIcon,
        text: 'Profilul Meu',
        href: Paths.PROFILE_DETAILS,
      },
      {
        icon: SmartToyIcon,
        text: 'Status Roboti',
        href: Paths.ROBOTS_STATUS,
      },
      {
        icon: ManageAccountsIcon,
        text: 'Administrare Utilizatori',
        href: Paths.USERS_MANAGEMENT,
        exactRole: Role.ITA,
      }
    ],
  },
];
