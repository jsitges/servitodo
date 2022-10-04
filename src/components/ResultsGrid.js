import React from "react";
import ProCard from "../components/ProCard";
import { connect } from "react-redux";

function ResultsGrid(props) {
  const calculateRange = (userZipCode) => {
    return [
      userZipCode - 2,
      userZipCode - 1,
      userZipCode,
      userZipCode + 1,
      userZipCode + 2,
    ];
  };

  const renderProCards = () => {
    let zipCodeRange = calculateRange(props.auth.zip_code);

    //      Filter by User's Zip Code
    // ----------x------------x------------
    let filteredPros = props.professionals.filter(
      (professional) =>
        professional.zip_code === zipCodeRange[0] ||
        professional.zip_code === zipCodeRange[1] ||
        professional.zip_code === zipCodeRange[2] ||
        professional.zip_code === zipCodeRange[3] ||
        professional.zip_code === zipCodeRange[4]
    );

    //         Filter by keyword
    //----------x------------x------------
    filteredPros = filteredPros.filter((professional) => {
      let lowerCaseIntro = professional.introduction.toLowerCase();
      let lowerCaseQuery = props.query.toLowerCase();

      if (
        lowerCaseIntro.includes(lowerCaseQuery) ||
        lowerCaseIntro.includes(lowerCaseQuery + "s")
      ) {
        return professional;
      }
    });

    //         Check for Filter
    //----------x------------x------------
    if (props.filter === "distance") {
      filteredPros = filteredPros.sort((a, b) =>
        a.zip_code > b.zip_code ? 1 : -1
      );
    } else if (props.filter === "price") {
      filteredPros = filteredPros.sort((a, b) =>
        a.estimated_cost > b.estimated_cost ? 1 : -1
      );
    } else if (props.filter === "rating") {
      filteredPros = filteredPros.sort((a, b) =>
        b.average_reviews > a.average_reviews ? 1 : -1
      );
    }

    if (filteredPros.length !== 0) {
      return filteredPros.map((professional, idx) => {
        return (
          <ProCard
            professional={professional}
            key={idx}
            history={props.history}
          />
        );
      });
    }
  };

  return <div>{renderProCards()}</div>;
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    professionals: state.professionals,
    query: state.query,
    filter: state.filter,
  };
};

export default connect(mapStateToProps, null)(ResultsGrid);
