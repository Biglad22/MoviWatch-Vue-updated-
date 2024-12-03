export const movieIcons = [
    {
      type:'action',
      cur:(x)=>{
        return  x ? '/icons/spy.png' : '/icons/spy-active.png';
      }
    },
    {
      type:'adventure',
      cur:(x)=>{
        return  x ? '/icons/adventure.png' : '/icons/adventure-active.png';
      }
    },
    {
      type:'animation',
      cur:(x)=>{
        return  x ? '/icons/horror.png' : '/icons/horror-active.png';
      }
    },
    {
      type:'comedy',
      cur:(x)=>{
        return  x ? '/icons/comedy.png' : '/icons/comedy-active.png';
      }
    },
    {
      type:'family',
      cur:(x)=>{
        return  x ? '/icons/horror.png' : '/icons/horror-active.png';
      }
    },
    {
      type:'horror',
      cur:(x)=>{
        return  x ? '/icons/horror.png' : '/icons/horror-active.png';
      }
    },
    {
      type:'romance',
      cur:(x)=>{
        return x ? '/icons/love.png' : '/icons/love-active.png';
      }
    },
    {
      type:'scifi',
      cur:(x)=>{
        return  x ? '/icons/horror.png' : '/icons/horror-active.png';
      }
    },
  ];

export const movieGenreCode = {
  action: 28,
  comedy: 35,
  adventure: 12,
  horror: 27, 
  romance: 10749,
  scifi: 878,
  family: 10751,
  animation: 16
} 