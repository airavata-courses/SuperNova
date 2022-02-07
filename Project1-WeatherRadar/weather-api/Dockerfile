FROM python:3.8
ADD . /app
ENV PYTHONPATH = "/app/modules/"
WORKDIR /app

ARG run_env
COPY requirements.txt .

RUN pip3 install --upgrade pip setuptools wheel
RUN pip3 install --upgrade pip
# RUN pip3 install --no-cache-dir --trusted-host pypi.python.org pipenv
# RUN pipenv lock -r > requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install arm-pyart

ENV run_env=$run_env


CMD python weatherApi.py  --pythonpath .