import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

// Tela de To-Do List
function ToDoListScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), title: task }]);
      setTask('');
    }
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputList}
          placeholder="Digite uma tarefa..."
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.title}</Text>
            <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Sem tarefas adicionadas!</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

// Tela de Instruções
function InstructionsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instruções</Text>
      <Text style={styles.instructionText}>
        1. Na aba "To-Do List", você pode adicionar tarefas digitando no campo e pressionando "+".{'\n'}
        2. Para remover uma tarefa, pressione "X" ao lado dela.{'\n'}
        3. Use este aplicativo para organizar suas atividades e tarefas diárias!
      </Text>
    </View>
  );
}

// Tela de Perfil
function ProfileScreen({ onLogout, user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.instructionText}>
        Nome: {user.name} {'\n'}
        Email: {user.email}
      </Text>
      <TouchableOpacity onPress={onLogout}>
        <Text style={styles.logoutButton}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tela de Login
function LoginScreen({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (name.trim() && email.trim() && password.trim()) {
      onLogin({ name, email });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Configuração da navegação por abas
const Tab = createBottomTabNavigator();

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  return (
    isLogged ? (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="To-Do List" component={ToDoListScreen} />
          <Tab.Screen name="Instructions" component={InstructionsScreen} />
          <Tab.Screen name="Profile">
            {() => <ProfileScreen onLogout={handleLogout} user={user}  />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    ) : (
      <LoginScreen onLogin={handleLogin} />
    )
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    width: '80%', 
    height: 50, 
    borderColor: '#ced4da',
    borderWidth: 1, 
    borderRadius: 8, 
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 25,
  },
  inputList: {
    width: '80%', 
    height: 50, 
    borderColor: '#ced4da',
    borderWidth: 1, 
    borderRadius: 8, 
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 1,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  loginButton: {
    width: '60%', 
    height: 50, 
    backgroundColor: '#6c757d', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 8,
    marginLeft: 60,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18, 
    fontWeight: 'bold', 
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  taskText: {
    fontSize: 16,
  },
  removeText: {
    color: '#ff4d4d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: 20,
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6c757d',
  },
  logoutButton: {
    color: '#dc3545',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
