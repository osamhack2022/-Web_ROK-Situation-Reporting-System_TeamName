import { View } from 'react-native'
import { Text, Colors } from 'react-native-paper'
import { styles } from './style'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'

export function ReportHeader(props) {
  let [fontsLoaded] = useNunitoFonts()
  return (
    <View style={styles.header}>
      <View style={styles.titleView}>
        <Text style={styles.title}>{props.Title}</Text>
        <Text
          style={[
            styles.status,
            {
              color:
                props.Status === 'Resolved' ? Colors.green700 : Colors.red600,
            },
          ]}
        >
          {props.Status === 'Resolved' ? '[종결]' : '[미종결]'}
        </Text>
      </View>
      <View style={styles.subView}>
        <Text style={styles.severityText}>중요도:</Text>
        <Text style={styles.severity}>{props.Severity}</Text>
        <Text style={styles.dateText}>{props.date}</Text>
      </View>
    </View>
  )
}
