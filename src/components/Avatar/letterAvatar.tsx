import Avatar from '@mui/material/Avatar';

type AvatarProps = {
    userName?: string;
    size: "small" | "normal" | "big"
}

function avatarStyle(size: string, name: string) {
  if(size === "small"){
    return {
      sx: {
        width: 23,
        height: 23,
        fontSize: 12,
        bgcolor: stringToColor(name)
      }
    }
  }
  if(size === "normal"){
    return {
      sx: {
        bgcolor: stringToColor(name)
      }
    }
  }
  if(size === "big"){
    return {
      sx: {
        width: 56,
        height: 56,
        fontSize: 40,
        bgcolor: stringToColor(name)
      }
    }
  }
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function LetterAvatar({userName, size}: AvatarProps) {
  return (
      <Avatar 
      {...stringAvatar(userName ? userName.toUpperCase() : "no name")} 
      {...avatarStyle(size, userName ? userName.toUpperCase() : "no name")} 
      /> 
  );
}
