# Underthesea service

Version: 1.1.7

## Download

Download underthesea service via git

```
$ git clone https://github.com/undertheseanlp/service.git
``` 

## Run service

```
$ cd service
$ conda create -n python=3.5 service
$ source activate service
$ pip install Cython
$ pip install -r requirements.txt
$ underthesea data
$ bash run.sh
```

Last Update: 05/2018