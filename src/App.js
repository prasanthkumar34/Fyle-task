import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import './app.style';
import Repo from './components/repo/index';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles, withStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';


const styles = makeStyles({
  wrapper: {
    padding: "40px"
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', repos: [], errorMessage: '', offset: 0, currentpage: 1, loading: false };
  }
  handleChange = (event) => {
    this.setState({ username: event.target.value }, () => {
      this.getRepos();
    });
  }

  getRepos = debounce((v) => {
    console.log(v);
    this.setState({ loading: true })
    const repoUrl = `https://api.github.com/users/${this.state.username}/repos`;
    axios.get(repoUrl, { params: { page: v } }).then((responses) => {
      // const repos = responses.data.map(({ name, language, html_url, created_at, description }) => {
      //   return { name, language, html_url, created_at, description };
      // })
      // let state_repo = this.state.repos
      console.log(responses)
      this.setState({ repos: responses.data, loading: false });
    }).catch(error => {
      console.log(`inside getrepos error: ${error}`)
      this.setState({
        errorMessage: error.response.statusText
      })
    })
  }, 1000)

  displayRepos() {
    console.log(this.state.repos)
    return this.state.repos.map(repo => <Repo key={repo.name} props={repo} />);
  }

  render() {
    const { classes } = this.props
    let currentpage = Math.ceil(this.state.repos.length / 10)
    const RepoStyle = styled.ul`
      list-style-type: none;
      right-spacing:10px;
      margin: 20px;
      padding: 50px;
      border-style: 15px solid ; 
      justify-content: space-between;
      display: flex;
      >li {
        padding: 10px 10px;
        border-style: solid solid solid solid; 
      }

      > li + li {
        border-top: 1px solid #ddd;
        padding: 40px 40px 40px 40px;
    }`;

    const InputGroup = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    `;

    const Input = styled.input`     
      width: 70%;
      height: 34px;
      padding: 10px 10px;
      box-sizing: border-box;
    `;

    const Button = styled.button`
      font-size: 1rem;
      background-color: #87bdd8;
      padding: 2px 10px;
      font-weight: 400;
      height: 34px;
      border: 1px solid #87bdd8;
      `;

    return (
      <React.Fragment>
        <InputGroup>
          <Input value={this.state.username}
            placeholder="Enter your github username"
            onChange={this.handleChange}
            key="username"
            autoFocus="autofocus">
          </Input>
          <Button onClick={this.getRepos}> Get repos</Button>
        </InputGroup>
        {this.state.repos.length > 0 && (this.state.loading ? <CircularProgress /> : <Grid className={classes.wrapper} sx={{ padding: "40px" }} container spacing={3}>{this.displayRepos()}</Grid>)}
        {(this.state.repos.length === 0) && <div>{this.state.errorMessage}</div>}
        <Pagination count={currentpage} onChange={(e, v) => { this.getRepos(v) }} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App);
