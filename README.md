# Server
## Make a virtual env 3.10 version
 py -3.10 -m venv venv
.\venv\Scripts\activate
 pip install -r requirements.txt
 pip install numpy==1.23.5
 pip install Flask==2.0.3 
 pip install werkzeug==2.2.2 
 pip install joblib==1.2.0
 pip install scikit-learn 
 pip install imbalanced-learn==0.7.0
 pip install scikit-learn==1.0.2   
 pip install xgboost  
 pip install flask-cors   
 ##To open code on jupyter:
 pip install jupyter
 pip install ipykernel
 python -m ipykernel install --user --name=venv --display-name "Python 3.10"
 jupyter notebook
 ##To start application by:   python app.py

 #Client
 npm install
 npm start
