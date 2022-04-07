FROM continuumio/anaconda3:2020.11
ADD . /app
# ENV PYTHONPATH = "/app/modules/"
ENV PATH "$PATH:/home/ubuntu/anaconda3/bin"
WORKDIR /app

ARG run_env
COPY requirements.txt .

# RUN pip3 install --upgrade pip setuptools wheel
# RUN pip3 install --upgrade pip
# RUN pip3 install --no-cache-dir --trusted-host pypi.python.org pipenv
# RUN pipenv lock -r > requirements.txt
RUN conda install -c anaconda python=3.8
RUN python --version
RUN pip install -r requirements.txt
# RUN pip3 install -r requirements.txt
# RUN conda install -c conda-forge cartopy
# RUN conda install -c anaconda basemap
# RUN pip3 install arm-pyart

ENV run_env=$run_env

RUN touch $HOME/.netrc
RUN echo "machine urs.earthdata.nasa.gov login ricjha password Application@1990" >> $HOME/.netrc
RUN chmod 0600 $HOME/.netrc
RUN touch $HOME/.urs_cookies

# CMD python merraApi.py  --pythonpath .

CMD python merraApi.py .
