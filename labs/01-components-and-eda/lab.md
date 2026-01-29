---
resources: donations.csv
subtitle: Components of Design and EDA
title: "Lab: Donations"
toc-title: Table of contents
---

## Introduction

Welcome to Stat 158! The goal of this exercise is to better understand
the key components of an experiment by comparing concepts from lecture
to a real study. The domain and setting of the research question often
impose unique constraints, leading to different approaches to designing
an experiment. We examine these below, before starting to work with the
data ourselves.

## Understanding the Experiment

We will be working with data from the Karlan and List (2007) study,
which investigates how matching grants affects charitable giving using a
large-scale experiment. Read through the paper while keeping a lookout
for concepts from lecture, and try to understand the motivations for
their design based on their setting and constraints. Use this to answer
the following questions in complete sentences.

1.  Identify and list the four components of the experimental design
    they used, i.e.

    -   The Nature of the Treatments.

    -   Choice of the Experimental Units.

    -   Manner of Assigning Units to Treatments

    -   The Nature of the Response

\
\
\
\
\
\
\
\
\
\

2.  What is the underlying research question? Please be as precise as
    possible.\

\
\
\
\
\

3.  Why does this study use a *natural* field experiment rather than a
    traditional *lab* experiment? List one advantage and disadvantage of
    using natural experiments over lab experiments.\

\
\
\
\
\
\

4.  List any three changes in design you think may benefit the study.
    What are their advantages?

\
\
\
\
\
\
\
\
\

5.  What is the population that the results of this study would
    generalize to? Are there any limitations to this because of the
    design?

\
\
\
\



### Exploratory Data Analysis

The dataset is stored in a `.csv` file. To load it into `R`, you'll need
the `readr` package, which is included inside the `tidyverse`. If you
haven't installed the tidyverse before, you can do so by running
`install.packages("tidyverse")` once.

Once you've installed the package, you can load it by running the
following line.

::: cell
``` {.r .cell-code}
# load tidyverse (includes readr for CSVs)
require(tidyverse)
require(knitr)
```
:::

To read a `.csv` file into `R`, use the `read_csv()` function from
`readr`:

::: cell
``` {.r .cell-code}
# load the data into R
donations <- read_csv("https://stat158.berkeley.edu/spring-2026/data/donations/donations.csv")
```
:::

6.  Take some time to acquaint yourself with the data; this process of
    exploratory data analysis is very important. Some basic questions to
    consider:

    -   What do each of the columns and rows represent?
    -   What are the units of measurement?
    -   What datatypes are used for each column?

7.  Often when working with categorical variables in our data, it is
    useful to convert them to the 'factor' data structure in R. This is
    easily done in base R with `df$col <- as.factor(df$col)` or with the
    `mutate()` function in the `tidyverse` . Convert the "treatment" and
    "control" columns to factors.

    ::: cell
    ``` {.r .cell-code}
    # convert columns to factor here
    ```
    :::

8.  Answer the following questions from the data:

    -   Are there any missing values?
    -   How are the data distributed in the sample?
    -   Are there any outlying values?

    Note that, for our purposes, we are interested only in the columns
    labeled "treatment," "control," and "amount." However, you may find
    it interesting to explore the rest of the data. Graphs such as
    barplots and density plots, contingency tables and summary
    statistics may be good starting points.

    ::: cell
    ``` {.r .cell-code}
    # save any exploratory analysis you do here
    ```
    :::

9.  Create a visualization that aims to convey broadly the effect of the
    treatment on the outcome here. This could be in the form of a graph
    or a table. Aim to convey a simple message clearly, and feel free to
    be creative!

    ::: cell
    ``` {.r .cell-code}
    # save the final visualization of treatment effect here 
    ```
    :::
