import React,{useState,useEffect} from 'react'
import logo from './images/logo.png';
import alanBtn from '@alan-ai/alan-sdk-web';
import Modal from './components/Modal/Modal';
import useStyles from './styles.js';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
const alankey ='f41dc9bcb1df12325af79d667992dffb2e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  
  const [isOpen, setIsOpen] = useState(false);


  const classes = useStyles();
    useEffect(()=>{
        alanBtn({
            key:alankey,
            onCommand: ({ command, articles, number }) => {
              if (command === 'newHeadlines') {
                setNewsArticles(articles);
                setActiveArticle(-1);
              } else if (command === 'instructions') {
                setIsOpen(true);
              } else if (command === 'highlight') {
                setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
              } else if (command === 'open') {
                const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                const article = articles[parsedNumber - 1];
      
                if (parsedNumber > articles.length) {
                  alanBtn().playText('Please try that again...');
                } else if (article) {
                  window.open(article.url, '_blank');
                  alanBtn().playText('Opening...');
                } else {
                  alanBtn().playText('Please try that again...');
                }
              }
            },
          });
        }, []);
  return (
    <div>
        <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="https://avatars.githubusercontent.com/u/51912776?v=4" className={classes.alanLogo} alt="logo" />
        <div>
        <Typography variant="body1" component="h2">
        <h1>VOICE ASSISTANT NEWS AI</h1>
        
        </Typography>
        </div>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
          <Typography variant="body1" component="h2">
            Created by
            <a className={classes.link} href="https://www.linkedin.com/in/subash-shumsher-gautam-13779716a/"> Subash Shumsher Gautam</a> -
            <a className={classes.link} href="https://github.com/shumshersubashgautam"> Github</a>
          </Typography>
          <img className={classes.image} src={logo} height="50px" alt="JSMastery logo" />
        </div>
      ) : null}
    
        </div>
  );
}

export default App