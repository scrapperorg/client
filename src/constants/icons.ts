import {
  GridOnOutlined as GridOnOutlinedIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  PlagiarismOutlined as PlagiarismOutlinedIcon,
  LaptopWindowsOutlined as LaptopWindowsOutlinedIcon,
  ScreenSearchDesktopOutlined as ScreenSearchDesktopOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
} from '@mui/icons-material';

export const SIDEBAR_BUTTONS_LIST = [
  {
    key: 'Monitor',
    Icon: GridOnOutlinedIcon,
  },
  {
    key: 'Document',
    Icon: DescriptionOutlinedIcon,
  },
  {
    key: 'Cautare Documente',
    Icon: PlagiarismOutlinedIcon,
  },
  {
    key: 'Proiect',
    Icon: LaptopWindowsOutlinedIcon,
  },
  {
    key: 'Cautare Proiecte',
    Icon: ScreenSearchDesktopOutlinedIcon,
  },
  {
    key: 'Optiuni',
    Icon: SettingsOutlinedIcon,
  },
  {
    key: 'Profilul meu',
    Icon: PersonOutlineOutlinedIcon,
  },
];
