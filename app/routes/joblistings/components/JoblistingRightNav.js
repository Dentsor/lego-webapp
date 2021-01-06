// @flow

import styles from './JoblistingRightNav.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Flex } from 'app/components/Layout';
import { CheckBox, RadioButton } from 'app/components/Form/';
import Button from 'app/components/Button';
import cx from 'classnames';
import type { ActionGrant } from 'app/models';
import qs from 'qs';

const updateFilters = (type, value, filters) => {
  const newFilter = {
    ...filters,
    [type]: filters[type].includes(value)
      ? filters[type].filter((x) => x !== value)
      : filters[type].concat(value),
  };
  return {
    ...(newFilter.grades.length > 0
      ? {
          grades: newFilter.grades.toString(),
        }
      : {}),
    //$FlowFixMe[exponential-spread]
    ...(newFilter.jobTypes.length > 0
      ? {
          jobTypes: newFilter.jobTypes.toString(),
        }
      : {}),
    ...(newFilter.workplaces.length > 0
      ? {
          workplaces: newFilter.workplaces.toString(),
        }
      : {}),
  };
};

const FilterLink = ({ type, label, value, filters }: Object) => (
  <Link
    to={{
      pathname: '/joblistings',
      search: qs.stringify(updateFilters(type, value, filters)),
    }}
    style={{ display: 'flex', flex: 1, alignItems: 'center' }}
  >
    <CheckBox id={label} value={filters[type].includes(value)} readOnly />

    <span>{label}</span>
  </Link>
);

type Filter = {
  grades: Array<string>,
  jobTypes: Array<string>,
  workplaces: Array<string>,
};

type Props = {
  actionGrant: ActionGrant,
  query: {
    grades: string,
    jobTypes: string,
    workplaces: string,
    order: string,
  },
  history: any,
};

type State = {
  filters: Filter,
  order: {
    deadline: boolean,
    company: boolean,
    createdAt: boolean,
  },
  displayOptions: boolean,
};

export default class JoblistingsRightNav extends Component<Props, State> {
  state = {
    filters: {
      grades: [],
      jobTypes: [],
      workplaces: [],
    },
    order: {
      deadline: true,
      company: false,
      createdAt: false,
    },
    displayOptions: true,
  };

  updateDisplayOptions = () => {
    this.setState({
      displayOptions: !this.state.displayOptions,
    });
  };

  toggleDisplay = (display: boolean) => ({
    display: display ? 'block' : 'none',
  });

  // eslint-disable-next-line
  componentWillReceiveProps = (nextProps: Props) => {
    const query = nextProps.query;
    this.setState({
      filters: {
        grades: query.grades ? query.grades.split(',') : [],
        jobTypes: query.jobTypes ? query.jobTypes.split(',') : [],
        workplaces: query.workplaces ? query.workplaces.split(',') : [],
      },
      order: {
        deadline:
          query.order === 'deadline' || !Object.keys(query).includes('order'),
        company: query.order === 'company',
        createdAt: query.order === 'createdAt',
      },
    });
  };

  handleQuery = (type: string, value: string, remove: boolean = false) => {
    const query = { ...this.props.query };
    if (remove) {
      delete query[type];
    } else {
      query[type] = value;
    }
    return query;
  };

  render() {
    return (
      <Flex column className={styles.box}>
        <h2 onClick={this.updateDisplayOptions} className={styles.optionsTitle}>
          <span>Valg</span>
          {this.state.displayOptions ? (
            <i
              style={{ marginLeft: '5px', marginTop: '10px' }}
              className="fa fa-caret-down"
            />
          ) : (
            <i
              style={{ marginLeft: '5px', marginTop: '10px' }}
              className="fa fa-caret-right"
            />
          )}
        </h2>
        <Flex
          column
          className={styles.options}
          style={{ display: this.state.displayOptions ? 'block' : 'none' }}
        >
          {this.props.actionGrant.includes('create') && (
            <Link to="/joblistings/create">
              <Button className={styles.createButton}>Ny jobbannonse</Button>
            </Link>
          )}
          <h3 className={cx(styles.rightHeader, styles.sortHeader)}>
            Sorter etter:
          </h3>
          <Flex justifyContent="flex-start" className={styles.sortNav}>
            <Flex>
              <label style={{ marginRight: '10px', cursor: 'pointer' }}>
                <RadioButton
                  name="sort"
                  id="deadline"
                  inputValue={true}
                  value={this.state.order.deadline}
                  onChange={() => {
                    this.props.history.push({
                      pathname: '/joblistings',
                      search: qs.stringify(
                        this.handleQuery('order', 'deadline')
                      ),
                    });
                  }}
                />
                Frist
              </label>
            </Flex>
            <Flex>
              <label style={{ cursor: 'pointer' }}>
                <RadioButton
                  name="sort"
                  id="company"
                  inputValue={true}
                  value={this.state.order.company}
                  onChange={() => {
                    this.props.history.push({
                      pathname: '/joblistings',
                      search: qs.stringify(
                        this.handleQuery('order', 'company')
                      ),
                    });
                  }}
                />
                Bedrift
              </label>
            </Flex>
            <Flex>
              <label style={{ cursor: 'pointer' }}>
                <RadioButton
                  name="sort"
                  id="createdAt"
                  inputValue={true}
                  value={this.state.order.createdAt}
                  onChange={() => {
                    this.props.history.push({
                      pathname: '/joblistings',
                      search: qs.stringify(
                        this.handleQuery('order', 'createdAt')
                      ),
                    });
                  }}
                />
                Publisert
              </label>
            </Flex>
          </Flex>
          <Flex column className={styles.filters}>
            <Flex
              column
              style={{ display: this.state.displayOptions ? 'block' : 'flex' }}
            >
              <h3 className={styles.rightHeader}>Klassetrinn:</h3>
              {['1', '2', '3', '4', '5'].map((element) => (
                <FilterLink
                  key={element}
                  type="grades"
                  label={`${element}. klasse`}
                  value={element}
                  filters={this.state.filters}
                />
              ))}
            </Flex>
            <Flex
              column
              style={{ display: this.state.displayOptions ? 'block' : 'flex' }}
            >
              <h3 className={styles.rightHeader}>Jobbtype:</h3>
              <FilterLink
                type="jobTypes"
                label="Sommerjobb"
                value="summer_job"
                filters={this.state.filters}
              />
              <FilterLink
                type="jobTypes"
                value="part_time"
                label="Deltid"
                filters={this.state.filters}
              />
              <FilterLink
                type="jobTypes"
                value="full_time"
                label="Fulltid"
                filters={this.state.filters}
              />
              <FilterLink
                type="jobTypes"
                value="master_thesis"
                label="Masteroppgave"
                filters={this.state.filters}
              />
              <FilterLink
                type="jobTypes"
                value="other"
                label="Annet"
                filters={this.state.filters}
              />
            </Flex>
            <Flex
              column
              style={{ display: this.state.displayOptions ? 'block' : 'flex' }}
            >
              <h3 className={styles.rightHeader}>Sted:</h3>
              {['Oslo', 'Trondheim', 'Bergen', 'Tromsø', 'Annet'].map(
                (element) => (
                  <FilterLink
                    type="workplaces"
                    key={element}
                    value={element}
                    label={element}
                    filters={this.state.filters}
                  />
                )
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}
